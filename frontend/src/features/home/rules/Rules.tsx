import { JerseyIcon, LineChartIcon, TrophyIcon } from '../../../components/icons/Icons';
import './Rules.css'

const Rules = () => {
    return (
        <section id="rules" className="how-works-section">
            <div className="how-works-container">
                <h2 className="section-title">Rules</h2>
                <p className="section-subtitle">
                    How points are awarded across the tournament.
                </p>
                <div className="steps-horizontal">
                    <div className="step-item">
                        <div className="step-icon-wrapper">
                            <LineChartIcon size={32} />
                            <span className="step-number">1</span>
                        </div>
                        <h3 className="step-title">Group Stage</h3>
                        <ul className="rules-points-list">
                            <li className="rules-points-row">
                                <span className="rules-points-label">Correct outcome</span>
                                <span className="rules-points-badge">2 pts</span>
                            </li>
                            <li className="rules-points-row">
                                <span className="rules-points-label">One correct score</span>
                                <span className="rules-points-badge">+1 pt</span>
                            </li>
                            <li className="rules-points-row">
                                <span className="rules-points-label">Exact scoreline</span>
                                <span className="rules-points-badge">+5 pts</span>
                            </li>
                            <li className="rules-points-row rules-points-row--total">
                                <span className="rules-points-label">Max per match</span>
                                <span className="rules-points-badge rules-points-badge--total">7 pts</span>
                            </li>
                            <li className="rules-points-row">
                                <span className="rules-points-label">Group winner</span>
                                <span className="rules-points-badge">7 pts</span>
                            </li>
                        </ul>
                    </div>
                    <div className="step-item">
                        <div className="step-icon-wrapper">
                            <TrophyIcon size={32} />
                            <span className="step-number">2</span>
                        </div>
                        <h3 className="step-title">Knockout Stage</h3>
                        <ul className="rules-points-list">
                            <li className="rules-points-row">
                                <span className="rules-points-label">Round of 32 — correct team</span>
                                <span className="rules-points-badge">3 pts</span>
                            </li>
                            <li className="rules-points-row">
                                <span className="rules-points-label">Round of 16 — correct team</span>
                                <span className="rules-points-badge">5 pts</span>
                            </li>
                            <li className="rules-points-row">
                                <span className="rules-points-label">Quarter-final — correct team</span>
                                <span className="rules-points-badge">9 pts</span>
                            </li>
                            <li className="rules-points-row">
                                <span className="rules-points-label">Semi-final — correct team</span>
                                <span className="rules-points-badge">12 pts</span>
                            </li>
                            <li className="rules-points-row">
                                <span className="rules-points-label">Final — correct team</span>
                                <span className="rules-points-badge">15 pts</span>
                            </li>
                            <li className="rules-points-row">
                                <span className="rules-points-label">Correct champion</span>
                                <span className="rules-points-badge">17 pts</span>
                            </li>
                        </ul>
                    </div>
                    <div className="step-item">
                        <div className="step-icon-wrapper">
                            <JerseyIcon size={32} />
                            <span className="step-number">3</span>
                        </div>
                        <h3 className="step-title">Top Scorer</h3>
                        <ul className="rules-points-list">
                            <li className="rules-points-row">
                                <span className="rules-points-label">Correct tournament top scorer</span>
                                <span className="rules-points-badge rules-points-badge--total">15 pts</span>
                            </li>
                        </ul>
                        <p className="section-content rules-top-scorer-note">
                            Awarded after the Final. Points go to everyone who predicted the player with the most non-own-goal goals.
                        </p>
                        <ul className="rules-points-list" style={{ marginTop: 'var(--spacing-sm)' }}>
                            <li className="rules-points-row">
                                <span className="rules-points-label">Team with most goals</span>
                                <span className="rules-points-badge rules-points-badge--total">10 pts</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Rules;