import styles from '../styles/passwordChecklist.module.css';
import { PASSWORD_RULES } from '../utils/passwordStrength';

export default function PasswordChecklist({ password }) {
    if (!password || password.length === 0) return null;

    return (
        <div className={styles.checklist}>
            <ul className={styles.list}>
                {PASSWORD_RULES.map((rule) => {
                    const passed = rule.test(password);
                    return (
                        <li key={rule.id} className={`${styles.item} ${passed ? styles.passed : ''}`}>
                            <span className={styles.icon}>{passed ? '✓' : '○'}</span>
                            {rule.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
