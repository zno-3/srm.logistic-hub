import AssetsPage from "./Assetspage";
import DriverCard from "../../components/Assets/DriverCard";

function Drivers() {
  //const getFilteredData = () => {
  //  if (activeFilters.includes(0)) {
  //    return drivers;
  //  }
  //  return drivers.filter((item) =>
  //    activeFilters.includes(Number(item.driverStatus))
  //  );
  //};

  return (
    <AssetsPage
      type="drivers"
      CardComponent={DriverCard}
      linkToNew="/assets/new-driver"
    />
  );
}
export default Drivers;
