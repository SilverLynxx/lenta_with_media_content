


db_01 = [
	{
	    'table_name': 'records',
	    'columns': '''
	        recordid varchar(45) PRIMARY KEY,
	        username varchar(30) REFERENCES s03.accounts (username) ON DELETE CASCADE,
	        post_date timestamp DEFAULT CURRENT_TIMESTAMP,
	        record_headline varchar(100),
	        record_text varchar(1000)
	    '''
	},
	{
		'table_name': 'tags',
		'columns': '''
			tagname varchar(100) PRIMARY KEY,
			UNIQUE(tagname)
		'''
	},
	{
		'table_name': 'records_tags',
		'columns': '''
			id serial PRIMARY KEY,
			tagname varchar(100) REFERENCES s03.tags (tagname) ON DELETE CASCADE,
			recordid varchar(45) REFERENCES s03.records (recordid) ON DELETE CASCADE,
			active bool DEFAULT true,
			UNIQUE(tagname, recordid) 
		'''
	}
]


