

db_03 = [
    {
        'table_name': 'media',
        'columns': '''
            mediaid varchar(45) PRIMARY KEY,
            media_type varchar(20),
            media_data varchar(500),
            username varchar(30) REFERENCES s03.accounts (username) ON DELETE CASCADE,
            media_description varchar(500),
            active boolean DEFAULT true
        '''
    },
    {
        'table_name': 'records_media',
        'columns': '''
            id serial PRIMARY KEY,
            mediaid varchar(45) REFERENCES s03.media (mediaid) ON DELETE CASCADE,
            recordid varchar(45) REFERENCES s03.records (recordid) ON DELETE CASCADE,
            active boolean DEFAULT true,
            UNIQUE(mediaid, recordid)
        '''
    }
]