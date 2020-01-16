

db_02 = [
    {
        'table_name': 'subscriptions_groups',
        'columns': '''
            subgroupid varchar(45) PRIMARY KEY,
            username varchar(30) REFERENCES s03.accounts (username) ON DELETE CASCADE,
            subgroupname varchar(50),
            date timestamp DEFAULT CURRENT_TIMESTAMP,
            active boolean DEFAULT true
        '''
    },
    {
        'table_name': 'tags_subscriptions',
        'columns': '''
            id serial PRIMARY KEY,
            subgroupid varchar(45) REFERENCES s03.subscriptions_groups (subgroupid) ON DELETE CASCADE,
            tagname varchar(100) REFERENCES s03.tags (tagname) ON DELETE CASCADE,
            active boolean DEFAULT true,
            UNIQUE(subgroupid, tagname)
        '''
    },
    {
        'table_name': 'accounts_subscriptions',
        'columns': '''
            id serial PRIMARY KEY,
            subgroupid varchar(45) REFERENCES s03.subscriptions_groups (subgroupid) ON DELETE CASCADE,
            username varchar(30) REFERENCES s03.accounts (username) ON DELETE CASCADE,
            active boolean DEFAULT true,
            UNIQUE(subgroupid, username)
        '''
    },
]