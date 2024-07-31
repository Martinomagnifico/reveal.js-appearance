"use strict";

const { src, dest, watch, series, parallel } = require('gulp');

const fs = require('fs');
const path = require('path');

const pkg = require('./package.json');
const sass = require('gulp-sass')(require('sass'));

const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const {rollup} = require('rollup');
const babel = require('@rollup/plugin-babel').default;
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve').default;
const terser = require('@rollup/plugin-terser');

const rename = require("gulp-rename");
const merge = require('merge-stream');
const tap = require('gulp-tap');
const del = require('del');

const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod';

/************
 FOLDERS
************/

const sourcefolder = "./src";

let demofolder = "./demo";
let distfolder = "./plugin";
let pluginfolder = isProduction ? `${distfolder}/${pkg.functionname.toLowerCase()}` : `${demofolder}/plugin/${pkg.functionname.toLowerCase()}`;

/************
 VIEW LOCALS
************/

const locals = {};
const mainlocals = {};
mainlocals.locals = locals;

locals.name = pkg.functionname;
locals.packagename = pkg.name;
locals.author = pkg.author;


/************
 BANNER
************/

const banner = `
/*****************************************************************
 *
 * ${pkg.functionname} for Reveal.js 
 * Version ${pkg.version}
 * 
 * @author: ${pkg.author.name}, ${pkg.author.email}
 * https://github.com/${pkg.author.username}
 *
 * @license 
 * MIT licensed
 * 
 * Copyright (C) 2023 ${pkg.author.name}
 *
 ******************************************************************/

\r\n
`


/************
 BABEL CONFIG
************/

const babelConfig = {
	babelHelpers: 'bundled',
	ignore: ['node_modules'],
	compact: false,
	presets: [[
		'@babel/preset-env',
		{
			corejs: 3,
			useBuiltIns: 'usage',
			modules: false
		}
	]]
};

/************
 GULP TASKS
************/

// Clean Tasks

const cleandist = () =>  {
	return del(distfolder, { read: false });
}
const cleandev = () =>  {
	return del(demofolder, { read: false });
}


// Copy dependencies

const copydeps = () => {
	// Get the dependencies from package.json
	let copydependencies = pkg.copydependencies;

	if ( JSON.stringify(copydependencies) === "{}" || JSON.stringify(copydependencies) === "[]"  || !copydependencies  ) {
		return src('.', {allowEmpty: true});
	} else {
		let tasks = copydependencies.map(function(dep){
			if (dep == "reveal.js") {
				// Copy only the basic Reveal.js files
				const revealbase = "node_modules/reveal.js/";

				return src([`${revealbase}dist/**`, `${revealbase}plugin/**`], { base: revealbase, encoding: false, buffer: true, removeBOM: false } ).pipe(dest(`${demofolder}`) )
			} else {
				// Copy any other dependencies (plugins). If they have names like reveal.js-plugin, remove the first part
				let basename = dep.replace('reveal.js-', '');
				return src([`node_modules/${dep}/plugin/${basename}/**`, `!node_modules/${dep}/**/plugin-src.js`], { encoding: false, buffer: true, removeBOM: false }).pipe(dest(`${demofolder}/plugin/${basename}`) )
			}
		});
		return merge(tasks);
	}
};

let cache = {};

const pluginjs = () => {
	return rollup({
		cache: cache.umd,
		input: `${sourcefolder}/plugin/js/plugin.js`,
		plugins: [
			babel( babelConfig ),
			resolve(),
			commonjs(),
			terser()
		]
	}).then( bundle => {
		cache.umd = bundle.cache;
		bundle.write({
			name: pkg.functionname,
			file: `${pluginfolder}/${pkg.functionname.toLowerCase()}.js`,
			format: 'umd',
			banner: banner,
			sourcemap: !isProduction
		})
		bundle.write({
			name: pkg.functionname,
			file: `${pluginfolder}/${pkg.functionname.toLowerCase()}.esm.js`,
			format: 'es',
			banner: banner,
			sourcemap: !isProduction
		});
	});
}

const pluginstyles = () => {
	return (
		src(`${sourcefolder}/plugin/css/plugin.scss`)
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(rename(`${pkg.functionname.toLowerCase()}.css`))
		.pipe(tap((file) => {
			file.contents = Buffer.concat([Buffer.from(banner),file.contents]);
		}))
		.pipe(dest(pluginfolder))
		.pipe(browserSync.stream())
	);
}

// TASKS FOR THE DEMO

const demostyles = () => {
	return (
		src(`${sourcefolder}/demo/css/*.scss`)
		.pipe(plumber())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(dest(`${demofolder}/assets/css`))
		.pipe(browserSync.stream())
	);
}

const demoviews = () => {
	return (
		src(`${sourcefolder}/demo/html/**/[^_]*.pug`)
		.pipe(plumber())
		.pipe(pug({
			basedir: sourcefolder,
			pretty: true,
			locals: mainlocals.locals
		}))
		.pipe(dest(`${demofolder}/`))
		.pipe(browserSync.stream())
	)
}

const demoimg = () => {
	const imagePath = path.join(`${sourcefolder}/demo/img`);
    if (!fs.existsSync(imagePath)) {
        return Promise.resolve(); // Return a resolved promise to indicate the task is complete
    }

	return (
		src(`${sourcefolder}/demo/img/**/*.{gif,jpg,png,svg}`, {encoding: false, buffer: true, removeBOM: false})
		.pipe(dest(`${demofolder}/assets/img/` ))
	)
};

const demovid = () => {
	const videoPath = path.join(`${sourcefolder}/demo/vid`);
    if (!fs.existsSync(videoPath)) {
        return Promise.resolve(); // Return a resolved promise to indicate the task is complete
    }

	return (
		src(`${sourcefolder}/demo/vid/**/*.{mp4,webm,ogg}`, {encoding: false, buffer: true, removeBOM: false})
		.pipe(dest(`${demofolder}/assets/vid/` ))
	)
};

const demomd = () => {
	return (
		src(`${sourcefolder}/demo/html/**/*.md`)
		.pipe(dest(`${demofolder}/` ))
		.pipe(browserSync.stream())
	)
};

const demofonts = () => {
    const fontsPath = path.join(`${sourcefolder}/demo/fonts`);
    if (!fs.existsSync(fontsPath)) {
        return Promise.resolve(); // Return a resolved promise to indicate the task is complete
    }

	return (
		src(`${sourcefolder}/demo/fonts/**/*.{eot,svg,woff,ttf,woff2}`, {encoding: false, buffer: true, removeBOM: false})
		.pipe(dest(`${demofolder}/assets/fonts/` ))
	)
};

// Browsersync Tasks
const serve = (callback) =>  {
	browserSync.init({
		notify: false,
		server: {
			baseDir: demofolder,
			directory: true
		}
	});
	callback();
}

const watchtask = (done) => {
	watch(`${sourcefolder}/**/*.pug`, demoviews);
	watch(`${sourcefolder}/demo/css/**/*.scss`, demostyles);
	watch(`${sourcefolder}/demo/**/*.md`, demomd);
	watch(`${sourcefolder}/plugin/css/*.scss`, pluginstyles);
	watch(`${sourcefolder}/plugin/js/**/*.js`, pluginjs);
	watch(`${sourcefolder}/**/*.{gif,jpg,png,svg}`, demoimg);
	done();
}

const devTask = parallel(copydeps, demofonts, demoimg, demovid, demostyles, demomd, pluginstyles, pluginjs, demoviews);
const buildTask = parallel(pluginstyles, pluginjs);

exports.demo = series(cleandev, devTask, serve, watchtask);
exports.build = series(cleandist, buildTask);