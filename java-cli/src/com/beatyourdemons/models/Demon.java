package com.beatyourdemons.models;

public class Demon extends Entity {

    private Demon(Builder builder) {
        this.name = builder.name;
        this.health = builder.health;
        this.maxHealth = builder.maxHealth;
        this.level = builder.level;
    }

    public static class Builder {
        private String name;
        private int health = 100;
        private int maxHealth = 100;
        private int level = 1;

        public Builder(String name) {
            this.name = name;
        }

        public Builder health(int health) {
            this.health = health;
            return this;
        }

        public Builder maxHealth(int maxHealth) {
            this.maxHealth = maxHealth;
            return this;
        }

        public Builder level(int level) {
            this.level = level;
            return this;
        }

        public Demon build() {
            return new Demon(this);
        }

    }

}
