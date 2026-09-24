import CategoriesPreview from "@/components/landingpage/categories-previews";
import RatingPreview from "@/components/landingpage/ratings-preview";
import SuggestionPreview from "@/components/landingpage/suggestions-preview";
import WelcomSection from "@/components/landingpage/welcom-section";
import { getArticles } from "@/service/firebase/database";
import { store_description, store_name, store_url } from "@/service/constants";

export default async function Home() {
  const articles = await getArticles();
  
  return (
    <div className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Store',
            name: store_name,
            description: store_description,
            url: `https://${store_url}`,
          }),
        }}
      />
      <WelcomSection></WelcomSection>
      <SuggestionPreview articles={articles} ></SuggestionPreview>
      <CategoriesPreview articles={articles}></CategoriesPreview>
      <RatingPreview></RatingPreview>
    </div>
  );
}
