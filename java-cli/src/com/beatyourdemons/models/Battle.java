package com.beatyourdemons.models;

import java.time.LocalDate;

public class Battle {

    private final String name;
    private final String description;
    private final String notes;
    private final LocalDate date;
    private final boolean won;
    private final Demon demon;

    private Battle(Builder builder) {
        this.name = builder.name;
        this.description = builder.description;
        this.notes = builder.notes;
        this.date = builder.date;
        this.won = builder.won;
        this.demon = builder.demon;
    }

    public String getName() { return name; }

    public String getDescription() { return description; }

    public String getNotes() { return notes; }

    public LocalDate getDate() { return date; }

    public boolean isWon() { return won; }

    public Demon getDemon() { return demon; }

    public Builder toBuilder() {
        return new Builder(this.name, this.demon)
                .description(this.description)
                .notes(this.notes)
                .date(this.date)
                .won(this.won);
    }

    public static class Builder {
        private String name;
        private String description = "";
        private String notes = "";
        private LocalDate date = LocalDate.now();
        private boolean won = true;
        private Demon demon;

        public Builder(String name, Demon demon) {
            this.name = name;
            this.demon = demon;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder notes(String notes) {
            this.notes = notes;
            return this;
        }

        public Builder date(LocalDate date) {
            this.date = date;
            return this;
        }

        public Builder won(boolean won) {
            this.won = won;
            return this;
        }

        public Battle build() {
            return new Battle(this);
        }

    }

}
