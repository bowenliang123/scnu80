/**
 * Wish
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	adapter: 'myLocalMySQLDatabase',

	attributes: {
		userId: {
			type: 'integer',
			required: true
		},

		nickname: {
			type: 'string',
			required: true
		},

		text: {
			type: 'string',
			required: true
		}
	}

};
