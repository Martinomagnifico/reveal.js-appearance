# Changelog

## [1.2.1] - 2023-07-22
### Added
- Fix for hidden items in print and speaker view


## [1.2.0] - 2023-05-05
### Added
- Added local, specified, auto-appear
- Added Markdown example
- Added fix for Quarto list items

### Changed
- Reordered documentation
- Fragments can now be Appearance items


## [1.1.3] - 2022-06-26
### Changed
- Fixed a bug if there was no previous slide


## [1.1.2] - 2022-06-26
### Added
- Added auto-loading of styles.

### Changed
- Changed the internal delay mechanism to use CSS animation delay in combination to adding the trigger on the parent, not each animated element. This will improve the performance.
- ***Breaking change***: Moved to Animate.css version 4, but added a compatibility mode

## [1.1.1] - 2021-11-27
### Added
- Added a new `autoappear` mode, for use in cases where adding animation classes is too much of a hassle, like inside Markdown.
- Started keeping the changelog.



## [1.1.0] - 2021-09-03
### Added
- Added Github corner badge

### Changed
- Changed readme



## [1.0.9] - 2021-06-30
### Changed
- Fixed a bug where '=' was '=='.



## [1.0.8] - 2021-06-27
### Added
- Choose an event at which Appearance launches its animations

### Changed
- Appearance now shows the complete slides from the overview



## [1.0.7] - 2020-06-28
### Changed
- Clearing timeouts that are in past slides. This solves 'hanging' Appearance items if you slide back and forth.



## [1.0.6] - 2020-06-28
### Changed
- Fix bug that hid Appearance items in PDF exports.



## [1.0.5] - 2020-05-20
### Added
- Added compatibility with the new Reveal.js 4 that changes the way plugins work.



## [1.0.4] - 2020-05-20
### Added
- The 1.0.4 release is compatible with Reveal.js 3. Reveal versions lower than 4 have no "slidetransitionend" event, so this release also has the Transit.js plugin included (see https://github.com/Martinomagnifico/reveal.js-transit for more information).
