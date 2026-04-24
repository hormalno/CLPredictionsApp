import { ChevronLeftIcon, ChevronRightIcon } from '../../../components/icons/Icons';
import './PredictionPagination.css';

const PredictionPagination = () => {
    return (
        <div className="my-predictions-pagination-controls">
            <button
            className="pagination-btn button btn-outline btn"
            >
            <ChevronLeftIcon size={16} />
            <text>Previous</text>
            </button>
            <div className="my-predictions-pagination-numbers">
            <button className="btn-sm button btn pagination-number">
                <text>1</text>
            </button>
            <button className="btn-sm button btn pagination-number">
                <text>2</text>
            </button>
            <button className="btn-sm button btn pagination-number">
                <text>3</text>
            </button>
            <span className="my-predictions-thq-pagination-ellipsis-elm">
                <text>...</text>
            </span>
            <button className="btn-sm button btn pagination-number">
                <text>12</text>
            </button>
            </div>
            <button className="pagination-btn button btn-outline btn">
            <ChevronRightIcon size={16} />
            <text>Next</text>
            </button>
        </div>
    );
};

export default PredictionPagination;