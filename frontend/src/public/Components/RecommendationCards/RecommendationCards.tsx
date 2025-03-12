import React from "react";
import AppCard from "../../ui/AppCard/AppCard";
import CardSkeleton from "../../ui/CardSkeleton/CardSkeleton";

interface Recommendation {
  category?: { name: string; id: string };
  title: string;
  images: string[];
  price: string;
}

interface RecommendationCardsProps {
  recommendations: Recommendation[];
  category?: string; // Optional category filter
  isLoading?: boolean;
}

const RecommendationCards: React.FC<RecommendationCardsProps> = ({
  recommendations = [],
  category,
  isLoading,
}) => {
  // Filter recommendations based on the provided category
  const filteredRecommendations = category
    ? recommendations.filter((rec) => rec.category?.name === category)
    : recommendations;
   
  //when its loading show skeleton
  if (isLoading) {
    return (
      <div className="flex gap-4 ">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <CardSkeleton key={index} />
          ))}
      </div>
    );
  }
  if (filteredRecommendations.length === 0) {
    return <p>No recommendations found for this category.</p>;
  }
  return (
    <>
    <h1 className="text-2xl pl-10">Products You Might Like</h1>
      <div className="flex gap-4 justify-center items-center">
        {filteredRecommendations?.map((rec, index) => (
          <AppCard key={index} title={rec.title} image={rec.images[0]} price={rec.price}/>
        ))}
      </div>
    </>
  );
};

export default RecommendationCards;
