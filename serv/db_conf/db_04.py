

db_04 = [
    {
	    'table_name': 'permission_groups',
	    'columns': '''
		    groupname varchar(20) PRIMARY KEY,
		    groupcode integer,
		    UNIQUE(groupcode)
	    '''
	},
    {
	    'table_name': 'permission_groups_accounts',
	    'columns': '''
	        id serial PRIMARY KEY,
		    groupname varchar(20) REFERENCES s03.permission_groups (groupname) ON DELETE CASCADE,
		    username varchar(20) REFERENCES s03.accounts (username) ON DELETE CASCADE,
		    active boolean DEFAULT true,
		    UNIQUE(groupname, username)
	    '''
	},
]