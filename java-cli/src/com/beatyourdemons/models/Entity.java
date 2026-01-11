package com.beatyourdemons.models;

/**
 * Abstract class for beings.
 * Defines the minimum attributes and behavior for a being.
 */
public abstract class Entity {

    private String name;
    private int health;
    private int maxHealth;
    private int level;

    public Entity(String name, int maxHealth) {
        this.name = name;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.level = 1;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getHealth() { return health; }
    public void setHealth(int health) { this.health = health; }

    public int getMaxHealth() { return maxHealth; }
    public void setMaxHealth(int maxHealth) { this.maxHealth = maxHealth; }

    @Override
    public String toString() {
        return String.format(
                "(name=%s, level=%d, hp=%d, maxhp=%d)",
                name,
                level,
                health,
                maxHealth
        );
    }
}
