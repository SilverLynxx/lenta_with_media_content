


db_00 = [
	{
	    'table_name': 'accounts',
	    'columns': '''
	        accountid serial PRIMARY KEY,
	        username varchar(30) NOT NULL,
	        email varchar(50) NOT NULL,
	        pass_sha3_512 varchar(200) NOT NULL,
	        UNIQUE(username),
	        UNIQUE(email)
	    '''
	},
]