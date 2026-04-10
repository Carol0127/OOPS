import { NavLink } from "react-router-dom";
import AboutSection from "../../components/AboutSection";
import SerieSwiper from "../../components/SeriesSwiper";
import Work from "../../components/Work";

const AboutData = [
  {
    subTitle: "The Misfits",
    title: "15+",
    content: "款拒絕被定義的變異角色",
    bg: "bg-secondary-900",
    subTitleColor: "text-secondary-300",
    titleColor: "text-secondary-500",
    contentColor: "text-secondary-100",
  },
  {
    subTitle: "Where",
    title: "70+",
    content: "個線下據點，持續入侵街頭",
    bg: "bg-accent-500",
    subTitleColor: "text-accent-100",
    titleColor: "text-accent-900",
    contentColor: "text-accent-100",
  },
  {
    subTitle: "Beautiful Errors",
    title: "1999+",
    content: "次實驗中被保留的完美失誤",
    bg: "bg-primary-500",
    subTitleColor: "text-primary-100",
    titleColor: "text-primary-900",
    contentColor: "text-primary-100",
  },
];

function About() {
  return (
    <>
      <section className="w-full lg:p-10 lg:mt-20 lg:mb-5">
        <div
          className="h-screen lg:h-[85vh] lg:py-20 lg:rounded-[100px] bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/AboutBG.webp?alt=media&token=ddbaf77c-6231-4fa1-93ad-7560667764b4")`,
          }}
        >
          <div className="invisible lg:visible max-w-324 mx-auto">
            <AboutSection isHero={true} />
          </div>
        </div>
      </section>
      <section className="max-w-324 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 py-20 lg:py-30 px-4 lg:px-0">
        <div className="col-span-1 lg:col-span-7 rounded-4xl overflow-hidden lg:h-156">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/About.webp?alt=media&token=f15a709a-52dd-4f27-93eb-83f031a6d85a"
            alt="oops born"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="col-span-1 lg:col-span-5 rounded-4xl bg-accent-500 p-10 justify-between flex flex-col gap-6">
          <div className="text-display-02">
            <h2 className="text-accent-900 mb-6">一個完美的，</h2>
            <h2 className="text-accent-100">失誤。</h2>
          </div>
          <div className="text-body-m text-accent-100 flex flex-col gap-4">
            <p>OOPS 的誕生，並不在計畫之中。</p>
            <p>
              2021
              年的某個深夜，工作室裡打翻了一罐螢光綠色的顏料，灑在了一個即將完成的素模公仔上。看著那無可挽回的「意外」，我們本想丟棄，但顏料滴落的軌跡與素模本身，卻產生了一種奇異、充滿生命力的街頭張力。
            </p>
            <p>
              於是，以「OOPS
              」為名的企劃正式啟動。我們保留了那滴顏料的意象，將高飽和色彩與精緻的潮流玩具結合，打造出擁抱混亂的 IP。
            </p>
          </div>
        </div>
      </section>
      <section className="bg-neutral-200 py-20 lg:py-30 ps-4 lg:px-0">
        <SerieSwiper />
      </section>
      <section className="w-full py-20 lg:py-40">
        <Work />
      </section>
      <section className="w-full py-14 lg:py-30  lg:px-10">
        <div
          className="rounded-4xl lg:rounded-[100px] px-4 lg:px-0 py-20 lg:py-40 bg-cover bg-center"
          style={{
            backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/AboutContact.webp?alt=media&token=197bbf66-9c07-41af-80b2-154aac29874d")`,
          }}
        >
          <div className="max-w-324 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 ">
            {AboutData.map((item) => (
              <div className={`${item.bg} lg:col-span-4 flex flex-col justify-between p-10 rounded-4xl lg:h-60`}>
                <h4 className={`${item.subTitleColor} text-heading-05`}>{item.subTitle}</h4>
                <div>
                  <h2 className={`${item.titleColor} text-display-03`}>{item.title}</h2>
                  <p className={`${item.contentColor} text-body-m`}>{item.content}</p>
                </div>
              </div>
            ))}
            <div className="lg:col-span-12">
              <NavLink
                to="/#/contact"
                className="flex justify-between items-center rounded-4xl p-7 lg:p-10 bg-success-700 text-display-04 text-success-100 hover:scale-105 transition-all"
              >
                Contact Us
                <span class="material-symbols-rounded align-bottom text-6xl! text-success-100">arrow_forward</span>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
