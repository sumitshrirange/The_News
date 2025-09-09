import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <div className="flex justify-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94"
        radius="9"
      />
    </div>
  );
}

export default Loader;
