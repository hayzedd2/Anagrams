import AnagramsUi from "@/components/AnagramsUi";
import Footer from "@/components/Footer";


const playgroundPage = () => {
  return (
    <section className=" text-[#3a3a3a] min-h-screen flex justify-between items-center">
      <main className="max-w-[40rem] mx-auto">
        <AnagramsUi/>
        <Footer/>
      </main>
    </section>
  );
};

export default playgroundPage;
