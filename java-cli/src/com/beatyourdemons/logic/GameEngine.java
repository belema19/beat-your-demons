package com.beatyourdemons.logic;

import com.beatyourdemons.ui.*;
import com.beatyourdemons.models.*;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class GameEngine {

    private MenuState currentMenuState = MenuState.MAIN_MENU;
    private final InputHandler input = new InputHandler();
    private final List<Demon> demons = new ArrayList<>();

    // Menus
    private enum MenuState {
        MAIN_MENU("BEAT YOUR DEMONS CLI",
                new String[]{"Manage Your Demons", "Manage Your Battles", "Exit"}),
        DEMON_CRUD("MANAGE YOUR DEMONS",
                new String[]{"Main Menu", "Create", "Show", "Update", "Delete", "Exit"}),
        BATTLE_CRUD("MANAGE YOUR BATTLES",
                new String[]{"Main Menu", "Create", "Show", "Update", "Delete", "Exit"}),
        EXIT("GOOD BYE", new String[]{});

        private final String banner;
        private final String[] options;

        MenuState(String banner, String[] options) {
            this.banner = banner;
            this.options = options;
        }

        public String getBanner() { return banner; }
        public String[] getOptions() { return options; }
    }

    public void start() {
        Display.showBanner(currentMenuState.getBanner());

        do {
            renderCurrentMenu();
        } while (currentMenuState != MenuState.EXIT );

    }

    public void renderCurrentMenu() {
        Display.showBanner(currentMenuState.getBanner());
        Display.showMenu(currentMenuState.getOptions());

        int choice = input.readInt();

        handleOptions(choice);
    }

    private void handleOptions(int choice) {
        switch (currentMenuState) {
            case MAIN_MENU -> {
                switch (choice) {
                    case 1 -> currentMenuState = MenuState.DEMON_CRUD;
                    case 2 -> currentMenuState = MenuState.BATTLE_CRUD;
                    case 3 -> currentMenuState = MenuState.EXIT;
                    default -> Display.showError("Invalid option.");
                }
            }
            case DEMON_CRUD -> {
                switch (choice) {
                    case 1 -> currentMenuState = MenuState.MAIN_MENU;
                    case 2 -> createDemon();
                    case 3 -> showDemons();
                    case 4 -> updateDemon();
                    case 5 -> deleteDemon();
                    case 6 -> currentMenuState = MenuState.EXIT;
                    default -> Display.showError("Invalid option.");
                }
            }
            case BATTLE_CRUD -> {
                switch (choice) {
                    case 1 -> currentMenuState = MenuState.MAIN_MENU;
                    case 2 -> createBattle();
                    case 3 -> showBattles();
                    case 4 -> updateBattle();
                    case 5 -> deleteBattle();
                    case 6 -> currentMenuState = MenuState.EXIT;
                    default -> Display.showError("Invalid option.");
                }
            }
        }
    }

    // --- DEMON CRUD ---
    private void createDemon() {
        Display.log("Enter demon name: ");
        String name = input.readString();

        Demon newDemon = new Demon.Builder(name).build();

        demons.add(newDemon);
        Display.log("Demon created and saved successfully!");
    }

    private void showDemons() {
        if (demons.isEmpty()) {
            Display.showError("No demons found in the underworld.");
            return;
        }

        Display.log("--- LIST OF DEMONS ---");
        for (int i = 0; i < demons.size(); i++) {
            System.out.println((i + 1) + ". " + demons.get(i));
        }
    }

    private void updateDemon() {
        if (demons.isEmpty()) {
            Display.showError("No demons to update.");
            return;
        }

        showDemons();
        Display.log("Enter the number of the demon to update: ");
        int index = input.readInt() - 1;

        if (index >= 0 && index < demons.size()) {
            Demon target = demons.get(index);

            // Name
            Display.log("Current name: " + target.getName());
            Display.log("Enter new name (or press Enter to keep current): ");
            String newName = input.readString();

            if (newName.isEmpty()) {
                Display.log("Name preserved.");
            } else {
                target.setName(newName);
                Display.log("Name updated to " + target.getName() + ".");
            }

            // Health
            Display.log("Current HP: " + target.getHealth());
            Display.log("Enter new HP (or press Enter to keep current): ");
            int newHealth = input.readInt();

            if (newHealth == -1) {
                Display.log("HP preserved.");
            } else {
                target.setHealth(newHealth);
                Display.log("HP updated to " + target.getHealth() + ".");
            }

            // Max Health
            Display.log("Current Max HP: " + target.getMaxHealth());
            Display.log("Enter new Max HP (or press Enter to keep current): ");
            int newMaxHealth = input.readInt();

            if (newMaxHealth == -1) {
                Display.log("Max HP preserved.");
            } else {
                target.setMaxHealth(newMaxHealth);
                Display.log("Max HP updated to " + target.getMaxHealth() + ".");
            }

        } else {
            Display.showError("Invalid index. No demon was updated.");
        }
    }

    private void deleteDemon() {
        if (demons.isEmpty()) {
            Display.showError("The underworld is already empty.");
            return;
        }

        showDemons();
        Display.log("Enter the number of the demon to delete: ");
        int index = input.readInt() - 1;

        if (index >= 0 && index < demons.size()) {
            Demon target = demons.remove(index);
            Display.log("Demon '" + target.getName() + "' has been banished.");
        } else {
            Display.showError("Invalid index. No demon was removed.");
        }
    }

    // --- BATTLE CRUD

    private void createBattle() {}

    private void showBattles() {}

    private void updateBattle() {}

    private void deleteBattle() {}

    }