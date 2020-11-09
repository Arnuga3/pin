 # PIN Generator
 
 - [Overview](#overview)
 - [Requirements Specification](#requirements)
 - [Program Design](#design)
 - [Improvement Ideas](#improvement)
 - [Technologies](#technology)
#

### <div id="overview">Overview</div>
A simple web based program that generates and emits PIN codes (Personal Identification
Numbers).
PIN Generator [demo](https://pintest.stackblitz.io/) on stackblitz  
PIN Generator [code](https://stackblitz.com/edit/pintest) on stackblitz Online IDE
Github [repo](https://github.com/Arnuga3/pin)
#

### <div id="requirements">Requirements Specification</div>

 - Program should generate and emit at least one PIN
 - Each PIN should be four digits long
 - Program should not generate "obvious" combination of digits
 - Program should generate PINs in random order
 - Program should not repeat a PIN until all the preceding valid PINs have been
emitted (even if the program is stopped and started again)
#

### <div id="design">Program Design</div>

The program generates all possible combinations of PINs and filters valid combinations according to the configuration. It uses browser's local storage to persist the data and config. The emitted PIN is taken out of the list of available valid PINs and placed on a separate list (there is no need to store the emitted PINs and it was retained for demonstration purposes). The data and configuration are retrieved showing the previous state of the application when the user leaves the application and visits it again.

#### Config
Some constants can be modified in the code to allow generating codes of other sizes (high level testing was made with 3 and 5 digit codes, any old config need to be removed from a storage).
Constants:

 - SEED (default "0123456789")
 - SIZE (default 4)

#### User Interface
The user interface consists of a simple card with some interactive elements and has a design similar to the Microsoft Fluent UI.

##### Main View
 - Title
 - Action buttons:
	 - Emit PIN - Display a new PIN
	 - Copy - Copy PIN to clipboard
	 - Regenerate - Reset existing PINs and generate a new set of PINs according to the existing settings
	 - Settings - Open configuration for the PINs to be generated
 - PIN display
 - Information labels showing the number of:
	 - Available PIN combinations
	 - Taken PIN combinations
	 - Invalid PIN combinations
##### Settings View
 - Number input field - to specify the minimum of unique digits per PIN
 - Checkbox input - to include/exclude incremental order PINs like "1234", "4567" etc.
 - Action buttons:
	 - Close - Close the configuration and open the main view
	 - Save & Regenerate - Apply configuration changes, reset current PINs and generate a new set
#


### <div id="improvement">Improvement Ideas</div>

 - Emit many PINs at once
 - Add functionality to export/download PINs in various formats
 - Convert application to PWA for offline use, or rewrite to React Native with a little effort
 - Make the data and config secure
#

### <div id="technology">Technologies</div>

PIN Generator is a responsive and platform independent web application, implemented using [React](https://reactjs.org/) JavaScript library. It is utilising [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) (local storage) to persist data state and configuration and is using the power of ES6 features and hooks.
##### Other dependencies:
[js-combinatorics](https://github.com/dankogai/js-combinatorics) - Simple combinatorics in JavaScript (generating combinations)

[seedrandom](https://github.com/davidbau/seedrandom) - Seeded random number generator for JavaScript (reasonably unpredictable Autoseeded ARC4-based PRNG)

[Styled components](https://styled-components.com/) - Best bits of ES6 and CSS to style apps without stress

[React Feather Icons](https://github.com/feathericons/react-feather) - Simply beautiful open source icons. A complete set of [Feather icons](https://feathericons.com/).

