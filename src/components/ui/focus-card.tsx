"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "./pagination";
import Image from "next/image";
import Link from "next/link";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <Image
        src={card.image || "/images/logo.png"}
        alt={card.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover absolute inset-0 opacity-80"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

export type FocusCardProps = {
  title: string;
  url: string;
  image: string;
};

export function FocusCards({
  cards,
  enablePagination = false,
  itemsPerPage = 4,
}: {
  cards: FocusCardProps[];
  enablePagination?: boolean;
  itemsPerPage?: number;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Paginate cards if enabled
  const paginatedCards = enablePagination
    ? cards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : cards;

  const totalPages = Math.ceil(cards.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-4 gap-10 max-w-7xl mx-auto w-full">
        {paginatedCards.map((card, index) => (
          <Link 
            href={card.url} 
            key={card.title} 
            className="group relative block overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            aria-label={`View project: ${card.title}`}
          >
            <Card
              card={card}
              index={index}
              hovered={hovered}
              setHovered={setHovered}
            />
          </Link>
        ))}
      </div>

      {enablePagination && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(index + 1);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
