import Navigation from "../../../components/navigation/Navigation";
import Footer from "../../../components/footer/Footer";
import "./MatchDetails.css";

const MatchDetails = () => {
    return (
        <>
        <Navigation />
        <header className="header-match-result">
          <div className="header-match-result__overlay"></div>
          <div className="header-match-result__container">
            <div className="header-match-result__top-actions">
              <a href="#">
                <div
                  aria-label="Go back to previous page"
                  className="header-match-result__back-btn btn-outline btn"
                >
                  <svg
                    fill="none"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m12 19l-7-7l7-7m7 7H5"></path>
                  </svg>
                  <span><text>Back</text></span>
                </div>
              </a>
            </div>
            <div className="header-match-result__content">
              <div className="header-match-result__status">
                <span><text>Full Time</text></span>
              </div>
              <div className="header-match-result__score-board">
                <div
                  className="header-match-result__team header-match-result__team--a"
                >
                  <div className="header-match-result__team-icon">
                    <span><text>A</text></span>
                  </div>
                  <h1 className="hero-title"><text>Team A</text></h1>
                </div>
                <div className="header-match-result__score-display">
                  <span className="header-match-result__score"><text>3</text></span>
                  <span className="header-match-result__divider">
                    <text>-</text>
                  </span>
                  <span className="header-match-result__score"><text>1</text></span>
                </div>
                <div
                  className="header-match-result__team--b header-match-result__team"
                >
                  <div className="header-match-result__team-icon">
                    <span><text>B</text></span>
                  </div>
                  <h1 className="hero-title"><text>Team B</text></h1>
                </div>
              </div>
              <p className="hero-subtitle">
                <text>MatchMates Friends League • Dec 15, 2026</text>
              </p>
            </div>
          </div>
        </header>
        <section className="goal-scorers">
          <div className="goal-scorers__container">
            <h2 className="section-title"><text>Goal Scorers</text></h2>
            <div className="goal-scorers__grid">
              <div className="goal-scorers__column">
                <div className="goal-scorers__team-header">
                  <span className="goal-scorers__team-name">
                    <text>Team A</text>
                  </span>
                  <span className="goal-scorers__total"><text>3 Goals</text></span>
                </div>
                <ul className="goal-scorers__list">
                  <li className="goal-scorers__item">
                    <div className="goal-scorers__icon-box">
                      <svg
                        fill="none"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle r="10" cx="12" cy="12"></circle>
                        <circle r="1" cx="12" cy="12"></circle>
                      </svg>
                    </div>
                    <div className="goal-scorers__info">
                      <span className="goal-scorers__name">
                        <text>Marcus Rashford</text>
                      </span>
                      <span className="goal-scorers__time">
                        <text>12', 45+2'</text>
                      </span>
                    </div>
                  </li>
                  <li className="goal-scorers__item">
                    <div className="goal-scorers__icon-box">
                      <svg
                        fill="none"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle r="10" cx="12" cy="12"></circle>
                        <circle r="1" cx="12" cy="12"></circle>
                      </svg>
                    </div>
                    <div className="goal-scorers__info">
                      <span className="goal-scorers__name">
                        <text>Bruno Fernandes</text>
                      </span>
                      <span className="goal-scorers__time">
                        <text>78' (P)</text>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="goal-scorers__column">
                <div className="goal-scorers__team-header">
                  <span className="goal-scorers__team-name">
                    <text>Team B</text>
                  </span>
                  <span className="goal-scorers__total"><text>1 Goal</text></span>
                </div>
                <ul className="goal-scorers__list">
                  <li className="goal-scorers__item">
                    <div className="goal-scorers__icon-box">
                      <svg
                        fill="none"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle r="10" cx="12" cy="12"></circle>
                        <circle r="1" cx="12" cy="12"></circle>
                      </svg>
                    </div>
                    <div className="goal-scorers__info">
                      <span className="goal-scorers__name">
                        <text>Erling Haaland</text>
                      </span>
                      <span className="goal-scorers__time"><text>34'</text></span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="user-predictions">
          <div className="user-predictions__container">
            <div className="user-predictions__header">
              <h2 className="section-title"><text>Friend Predictions</text></h2>
              <p className="section-content">
                <text>See who called it right in the MatchMates group.</text>
              </p>
            </div>
            <div className="user-predictions__grid">
              <article
                className="user-predictions__card user-predictions__card--correct"
              >
                <div className="user-predictions__user-info">
                  <div className="user-predictions__avatar">
                    <svg
                      fill="none"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
                        ></path>
                        <circle r="4" cx="12" cy="7"></circle>
                      </g>
                    </svg>
                  </div>
                  <div className="user-predictions__meta">
                    <h3 className="user-predictions__username">
                      <text>Alex Smith</text>
                    </h3>
                    <span className="user-predictions__status-label">
                      <text>Correct Score</text>
                    </span>
                  </div>
                  <div className="user-predictions__badge">
                    <svg
                      fill="none"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      stroke="#2ecc71"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                      <path d="m9 11l3 3L22 4"></path>
                    </svg>
                  </div>
                </div>
                <div className="user-predictions__score-box">
                  <span className="user-predictions__predicted-score">
                    <text>3 - 1</text>
                  </span>
                </div>
              </article>
              <article
                className="user-predictions__card--incorrect user-predictions__card"
              >
                <div className="user-predictions__user-info">
                  <div className="user-predictions__avatar">
                    <svg
                      fill="none"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
                        ></path>
                        <circle r="4" cx="12" cy="7"></circle>
                      </g>
                    </svg>
                  </div>
                  <div className="user-predictions__meta">
                    <h3 className="user-predictions__username">
                      <text>Jordan Lee</text>
                    </h3>
                    <span className="user-predictions__status-label">
                      <text>Close Call</text>
                    </span>
                  </div>
                  <div className="user-predictions__badge">
                    <svg
                      fill="none"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      stroke="#e74c3c"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle r="10" cx="12" cy="12"></circle>
                      <path d="m15 9l-6 6m0-6l6 6"></path>
                    </svg>
                  </div>
                </div>
                <div className="user-predictions__score-box">
                  <span className="user-predictions__predicted-score">
                    <text>2 - 1</text>
                  </span>
                </div>
              </article>
              <article
                className="user-predictions__card--incorrect user-predictions__card"
              >
                <div className="user-predictions__user-info">
                  <div className="user-predictions__avatar">
                    <svg
                      fill="none"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
                        ></path>
                        <circle r="4" cx="12" cy="7"></circle>
                      </g>
                    </svg>
                  </div>
                  <div className="user-predictions__meta">
                    <h3 className="user-predictions__username">
                      <text>Sarah Chen</text>
                    </h3>
                    <span className="user-predictions__status-label">
                      <text>Wrong Winner</text>
                    </span>
                  </div>
                  <div className="user-predictions__badge">
                    <svg
                      fill="none"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      stroke="#e74c3c"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle r="10" cx="12" cy="12"></circle>
                      <path d="m15 9l-6 6m0-6l6 6"></path>
                    </svg>
                  </div>
                </div>
                <div className="user-predictions__score-box">
                  <span className="user-predictions__predicted-score">
                    <text>1 - 2</text>
                  </span>
                </div>
              </article>
              <article
                className="user-predictions__card user-predictions__card--correct"
              >
                <div className="user-predictions__user-info">
                  <div className="user-predictions__avatar">
                    <svg
                      fill="none"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
                        ></path>
                        <circle r="4" cx="12" cy="7"></circle>
                      </g>
                    </svg>
                  </div>
                  <div className="user-predictions__meta">
                    <h3 className="user-predictions__username">
                      <text>Mike Ross</text>
                    </h3>
                    <span className="user-predictions__status-label">
                      <text>Correct Score</text>
                    </span>
                  </div>
                  <div className="user-predictions__badge">
                    <svg
                      fill="none"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      stroke="#2ecc71"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                      <path d="m9 11l3 3L22 4"></path>
                    </svg>
                  </div>
                </div>
                <div className="user-predictions__score-box">
                  <span className="user-predictions__predicted-score">
                    <text>3 - 1</text>
                  </span>
                </div>
              </article>
            </div>
          </div>
        </section>
        <Footer />
        </>
    );
};

export default MatchDetails;
