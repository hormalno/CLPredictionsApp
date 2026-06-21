/* ---------- Danger zone ---------- */
type Props = {
    onDelete: () => void;
};

const DangerZone = ({ onDelete } : Props) => {
  return (
    <section className="pm-card pm-danger-card">
      <div className="pm-danger-row">
        <div>
          <div className="pm-pr-title">Delete account</div>
          <div className="pm-pr-desc">Permanently remove your account, predictions and league history. This can't be undone.</div>
        </div>
        <button className="pm-btn pm-btn-danger" onClick={onDelete}>Delete Account</button>
      </div>
    </section>
  );
};

export default DangerZone;