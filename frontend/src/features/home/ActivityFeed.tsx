import './ActivityFeed.css'

const ActivityFeed = () => {
    return (
        <section className="activity-feed-section">
            <div className="activity-feed-container">
            <h2 className="section-title">Recent Activity Feed</h2>
            <p className="section-subtitle">
                Live feed of friends&apos; recent predictions and results.
            </p>
            <div className="timeline-vertical">
                <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                    <div className="timeline-meta">
                    <span>10 minutes ago</span>
                    </div>
                    <p className="section-content">
                    <span className="home-text68">Alex</span>
                    <span>
                        {' '}
                        predicted 2-0 for Arsenal vs Liverpool.
                        <span
                        dangerouslySetInnerHTML={{
                            __html: ' ',
                        }}
                        />
                    </span>
                    </p>
                </div>
                </div>
                <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                    <div className="timeline-meta">
                    <span>1 hour ago</span>
                    </div>
                    <p className="section-content">
                    <span className="home-text71">Jordan</span>
                    <span>
                        {' '}
                        earned 10 points for a perfect score in Man City vs Bayern.
                        <span
                        dangerouslySetInnerHTML={{
                            __html: ' ',
                        }}
                        />
                    </span>
                    </p>
                </div>
                </div>
                <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                    <div className="timeline-meta">
                    <span>3 hours ago</span>
                    </div>
                    <p className="section-content">
                    <span className="home-text74">Sam</span>
                    <span>
                        {' '}
                        joined the &quot;Elite Predictors&quot; group.
                        <span
                        dangerouslySetInnerHTML={{
                            __html: ' ',
                        }}
                        />
                    </span>
                    </p>
                </div>
                </div>
                <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                    <div className="timeline-meta">
                    <span>Yesterday</span>
                    </div>
                    <p className="section-content">
                    <span className="home-text77">Casey</span>
                    <span>
                        {' '}
                        updated their prediction for tonight&apos;s El Clásico.
                        <span
                        dangerouslySetInnerHTML={{
                            __html: ' ',
                        }}
                        />
                    </span>
                    </p>
                </div>
                </div>
            </div>
            </div>
            </section>
    );
};

export default ActivityFeed;