import AnagramsUi from "@/components/AnagramsUi";


const playgroundPage = () => {
  return (
    <section className="bg-white text-[#3a3a3a] min-h-screen flex justify-center items-center">
      <main className="max-w-[40rem] mx-auto">
        <AnagramsUi/>
      </main>
    </section>
  );
};

export default playgroundPage;
