"""BEAT YOUR DEMONS"""
import os
from crud import init_profile, create_demon, delete_demon,\
edit_demon, show_demons, start_battle, rand_demon, update_battle

def main():

    if not os.path.exists('byt_db.json'):
        init_profile()

    while True:

        print('\nWhat do you want to do?\n')

        cmd = input(' -> (show, random, battle, update battle, create, delete, edit): ')

        match cmd:

            case 'show':
                show_demons()
            
            case 'random':
                rand_demon()

            case 'battle':
                start_battle()

            case 'update battle':
                update_battle()

            case 'create':
                create_demon()

            case 'delete':
                delete_demon()

            case 'edit':
                edit_demon()

        end_session = input('\nDo you want to end session? (y/n): ')

        if end_session == 'y':
            break


if __name__ == "__main__":
    main()