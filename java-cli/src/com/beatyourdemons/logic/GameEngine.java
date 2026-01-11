package com.beatyourdemons.logic;

import com.beatyourdemons.ui.*;
import com.beatyourdemons.models.*;
import java.util.ArrayList;
import java.util.List;

public class GameEngine {

    private boolean isRunning = true;
    private final InputHandler input = new InputHandler();

    private final List<Demon> demons = new ArrayList<>();

    public void start() {
        Display.showBanner();

        while(isRunning) {
            String[] mainMenu = {"Create", "Show", "Update", "Delete", "Exit"};
            Display.showMenu(mainMenu);

            int choice = input.readInt();
            handleMainOptions(choice);

        }

        Display.log("Good bye.");
    }

    private void handleMainOptions(int choice) {
        switch (choice) {
            case 1 -> createDemon();
            case 2 -> showDemons();
            case 3 -> updateDemon();
            case 4 -> deleteDemon();
            case 5 -> isRunning = false;
            default -> Display.showError("Invalid option.");
        }
    }

    // --- Storage ---
    private void createDemon() {
        Display.log("Enter demon name: ");
        String name = input.readString();

        Demon newDemon = new Demon(name, 100);

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

}