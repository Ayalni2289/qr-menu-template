import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuExperience from "@/components/MenuExperience";
import { storeConfig } from "@/config/store.config";

export default function MenuPage() {
  const { store, contact, categories } = storeConfig;

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col bg-paper">
      <Header store={store} contact={contact} />
      <MenuExperience
        categories={categories}
        currency={store.currency}
        contact={contact}
        storeName={store.name}
      />
      <Footer store={store} contact={contact} />
    </main>
  );
}
