import { LazyLoadImage } from "react-lazy-load-image-component";
import farm from "../../assets/farm.png";
import { styles } from "../../styles/styles";

function WorkShowcase() {
  return (
    <section className="bg-white py-8">
      <div
        className={`flex flex-col gap-y-4 justify-center ${styles.maxWidth}`}
      >
        <LazyLoadImage src={farm} className="w-2/3 self-center" />

        <div className="">
          <div>
            <h1>Our Solution</h1>
            <p>
              At RootBounty, we are dedicated to connecting farmers and buyers
              in the tuber crop industry through a seamless, user-friendly
              platform. Here&apos;s what we offer:
            </p>
          </div>

          <div>
            <h2>For Farmers</h2>

            <div>
              <h3>Sell Your Crops</h3>
              <p>
                List your fresh tuber crops, including yams, cassava, sweet
                potatoes, and more, for buyers to discover and purchase
                directly.
              </p>
            </div>

            <div>
              <h3>Market Expansion</h3>
              <p>
                Access a broader market of local and international buyers,
                helping you grow your farm business.
              </p>
            </div>

            <div>
              <h3>Sales Management</h3>
              <p>
                Easily manage your product listings, orders, and payments
                through a streamlined dashboard.
              </p>
            </div>

            <div>
              <h3>Secure Transactions</h3>
              <p>
                We ensure safe and reliable transactions, so you can focus on
                your crops while we handle the financials
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkShowcase;
