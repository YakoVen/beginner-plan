import CategoriesPreview from "@/components/landingpage/categories-previews";
import RatingPreview from "@/components/landingpage/ratings-preview";
import SuggestionPreview from "@/components/landingpage/suggestions-preview";
import WelcomSection from "@/components/landingpage/welcom-section";
import { getArticles } from "@/service/suberbase/databasehandle";

export default async function Home() {

  const articles = await getArticles();
  return (
    <div className="">
      <WelcomSection></WelcomSection>
      <SuggestionPreview articles={articles} ></SuggestionPreview>
      <CategoriesPreview articles={articles}></CategoriesPreview>
      <RatingPreview></RatingPreview>
    </div>
  );
}
