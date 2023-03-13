require('dotenv').config();
module.exports = {
	schema: [
		{
			[process.env.PUBLIC_HASURA_URL]: {
				headers: {
					'x-hasura-admin-secret': process.env.PUBLIC_HASURA_ADMIN_SECRET
				}
			}
		}
	],
	documents: ['./src/**/*.graphql'],
	overwrite: true,
	generates: {
		'./src/graphql/graphql.ts': {
			plugins: ['typescript', 'typescript-operations', 'typescript-generic-sdk'],
			config: {
				useTypeImports: true
			}
		}
	}
};
