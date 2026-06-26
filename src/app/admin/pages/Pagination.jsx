import "./Pagination.css";

const Pagination = ({
    page,
    totalPages,
    onPageChange
}) => {

    if (totalPages <= 1) return null;

    const pages =
        [...Array(totalPages)]
            .map((_, i) => i + 1);

    return (
        <div className="pagination">

            <button
                className="prev"
                disabled={page === 1}
                onClick={() =>
                    onPageChange(page - 1)
                }
            >
                Prev
            </button>

            {
                pages.map((p) => (
                    <button
                        key={p}
                        className={
                            p === page
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            onPageChange(p)
                        }
                    >
                        {p}
                    </button>
                ))
            }

            <button
                className="next"
                disabled={page === totalPages}
                onClick={() =>
                    onPageChange(page + 1)
                }
            >
                Next
            </button>

        </div>
    );
};

export default Pagination;