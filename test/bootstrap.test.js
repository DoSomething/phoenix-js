'use strict';

/**
 * Setup.
 */
require('dotenv').config({ silent: true });

/**
 * Run rests.
 */
require('./lib/constructor.test');
require('./lib/user.test');
