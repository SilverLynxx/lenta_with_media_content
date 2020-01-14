import hashlib



async def generate_pass_hash(username, password):
    h = hashlib.sha3_512(f'{username}:{password}'.encode('utf-8')).hexdigest()
    return f'$sha3_512${h}'
