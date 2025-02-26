// Example items, to simulate fetching from another resources.

interface PaginationProps {
    items: number[];
}

const Pagination: React.FC<PaginationProps>=({ items }) =>{
  return (
    <>
      {items &&
        items.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}
export default Pagination;