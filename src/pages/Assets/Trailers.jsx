import TrailerCard from "../../components/Assets/TrailerCard";
import AssetsPage from "./Assetspage";

function Trailers() {






  //const handleFilterClick = (filter) => {
  //  if (filter === 0) {
  //    setActiveFilters([0]);
  //  } else {
  //    setActiveFilters((prev) => {
  //      const isActive = prev.includes(filter);
  //      if (isActive) {
  //        return prev.filter((f) => f !== filter);
  //      } else {
  //        return [...prev.filter((f) => f !== 0), filter];
  //      }
  //    });
  //  }
  //};

  //const getFilteredData = () => {
  //  if (activeFilters.includes(0)) {
  //    return trailers;
  //  }
  //  return trailers.filter((item) =>
  //    activeFilters.includes(Number(item.trailerStatus))
  //  );
  //};

  return (
    <AssetsPage
      type="trailers"
      CardComponent={TrailerCard}
      linkToNew="/assets/new-trailer"
    />
  );
}
export default Trailers;
