'use strict';

/**
 * Setup.
 */
require('dotenv').config({ silent: true });

/**
 * Run rests.
 */
require('./lib/constructor.test.js');
require('./lib/user.test.js');
