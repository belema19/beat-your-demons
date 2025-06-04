import os, json, datetime, random


def init_profile(filename='byt_db.json'):
    """Initialize warrior profile"""


    profile = {}

    profile['Warrior'] = input('A new warrior is born! How is he/she named?: ')
    profile['Honor'] = 0
    profile['Demons'] = []

    try:

        with open(filename, mode='w', encoding='utf-8') as f:
            json.dump(profile, f, indent=2)
            print("Profile created successfully")

    except Exception as e:

        print(f"There was a error creating the profile: {e}")


def get_data(filename='byt_db.json') -> dict: # type: ignore
    """Get the data from Json file"""
    try:

        with open(filename, mode='r', encoding='utf-8') as f:
            existing_data = json.load(f)

    except Exception as e:
     
        print(f'Error loading the data: {e}')

    else:
         
         return existing_data


def save_data(data, filename='byt_db.json'):
    """Save the data into Json file"""
    print('\nSaving data...\n')

    try:

        with open(filename, mode='w', encoding='utf-8') as f:
                json.dump(data, f, indent=2)
                print("\n Data saved successfully\n")

    except Exception as e:

        print(f"Error saving the data: {e}")


def create_demon():
    """Create a new demon"""

    demon_data = {}
    demon_data['name'] = input('How is this awful beast named?: ')
    demon_data['level'] = input("What's its level of strenght (priority)?: ")
    demon_data['battle_log'] = []

    profile_data = get_data()

    profile_data['Demons'].append(demon_data)

    save_data(profile_data)

    print("\nDemon created successfully\n")


def find_demon(profile_data:dict) -> int | None:
    """Find a demon by its name"""

    demon_name = input("\nWhat's the name of the demon?: ")


    for i, demon in enumerate(profile_data['Demons']):

        if demon['name'] == demon_name:
            return i

    print(f"Demon not found: {demon_name}")
    return None


def delete_demon():
    """Delete a demon"""

    profile_data = get_data()

    demon_idx = find_demon(profile_data=profile_data)

    del profile_data['Demons'][demon_idx]

    if demon_idx == None:
        return

    save_data(profile_data)


def edit_demon():
    """Edit a demon"""

    profile_data = get_data()

    demon_idx = find_demon(profile_data=profile_data)

    demon_data = profile_data['Demons'][demon_idx]

    print(f"\nThis is the demon found: {demon_data}\n")

    while True:

        cmd = input('What do you want to change? (name, level): ')

        match cmd:

            case 'name':
                new_name = input('\nWrite the new name: ')
                demon_data['name'] = new_name
                profile_data['Demons'][demon_idx] = demon_data

            case 'level':
                new_level = input('\nWrite the new level: ')
                demon_data['level'] = new_level
                profile_data['Demons'][demon_idx] = demon_data

            case _:
                print('\nInvalid option, please try again\n')

        end_cmd = input('\nDo you want to exit editing? (y/n): ')

        if end_cmd == 'y':
            break

    save_data(profile_data)


def show_demons():
    """Show all existing demons"""

    profile_data = get_data()

    i = 1
    for demon in profile_data['Demons']:

        print(f'{i} -> {demon}')
        i += 1

def start_battle():
    """Start battle with a demon"""

    profile_data = get_data()
    
    demon_idx = find_demon(profile_data=profile_data)

    battle_data = {}

    battle_data['name'] = input('How this awesome or tragic battle will be known?: ')
    battle_data['start_time'] = datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
    battle_data['end_time'] = None
    battle_data['result'] = 'started'

    profile_data['Demons'][demon_idx]['battle_log'].append(battle_data)

    print(f"\nStarted battle: {battle_data}\nIt will be remembered by ages!\n")

    save_data(profile_data)


def rand_demon():
    """Show a random demon"""

    profile_data = get_data()

    n = len(profile_data['Demons'])

    demon_idx = random.randrange(0, n)

    print(f"Oh, no! I demon has crossed in your way!\n-> {profile_data['Demons'][demon_idx]}")

