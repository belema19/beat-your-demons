package com.beatyourdemons.ui;

public class Display {

    public static void showBanner() {
        System.out.println("==========================================");
        System.out.println("           BEAT YOUR DEMONS v0.4          ");
        System.out.println("==========================================");
    }

    public static void showMenu(String[] options) {
        System.out.println("\nWhat do you want to do?");
        for (int i = 0; i < options.length; i++) {
            System.out.println((i + 1) + ". " + options[i]);
        }
        System.out.print("> ");
    }

    public static void log(String message) {
        System.out.println("\n[INFO]");
        System.out.print(message + "\n");

    }

    public static void showError(String error) {
        System.err.println("\n[ERROR]");
        System.err.println(error + "\n");
    }

}
