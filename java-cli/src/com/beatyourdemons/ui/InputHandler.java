package com.beatyourdemons.ui;
import java.util.Scanner;

public class InputHandler {
    private final Scanner scanner = new Scanner(System.in);

    public String readString() {
        return scanner.nextLine().trim();
    }

    public int readInt() {
        while (true) {
            String inputValue = readString();

            if (inputValue.isEmpty()) {
                return -1;
            }

            try {
                return Integer.parseInt(inputValue);
            } catch (NumberFormatException e) {
                Display.showError("Please, enter a valid number.");
            }
        }
    }

}
