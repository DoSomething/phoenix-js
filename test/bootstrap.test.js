'use strict';

/**
 * Setup.
 */
require('dotenv').config({ silent: true });

/**
 * Run rests.
 */
require('./lib/environment.test');
require('./lib/constructor.test');
require('./lib/system.test');
require('./lib/user.test');