package com.beatyourdemons.models;

/**
 * Abstract class for beings.
 * Defines the minimum attributes and behavior for a being.
 */
public abstract class Entity {

    protected String name;
    protected int health;
    protected int maxHealth;
    protected int level;

    protected Entity() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getHealth() { return health; }
    public void setHealth(int health) { this.health = health; }

    public int getMaxHealth() { return maxHealth; }
    public void setMaxHealth(int maxHealth) { this.maxHealth = maxHealth; }

    public int getLevel() { return level; }
    public void setLevel(int level) { this.level = level; }

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
