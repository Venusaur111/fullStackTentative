/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('users', {
        id: 'id',
        name: {type: 'varchar(255)', notNull: true},
        email: { type: 'varchar(255)', notNull: true, unique: true },
        password: { type: 'varchar(255)', notNull: true, unique: true },
        phone_number: { type: 'varchar(50)'},
        created_at:{
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });
    pgm.createTable('students', {
        id: 'id',
        user_id: {
            type: 'integer',
            notNull: true,
            reference: '"users"',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        student_id: {
            type: 'varchar(5)',
            notNull: true,
            unique: true,
        }
    });

    pgm.addConstraint('students', 'student_id_format', {
        check: "student_id ~ '^STD[0-9]{5}$'"
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('users');
    pgm.dropTable('students');
};
