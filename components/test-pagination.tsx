import { Pagination, PaginationItemType } from "@heroui/pagination";
import { cn } from "@heroui/theme";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  answers: { [questionId: string]: string };
  length: number;
}

export default function TestPagination({
  currentPage,
  setCurrentPage,
  answers,
  length,
}: IProps) {
  return (
    <Pagination
      page={currentPage}
      total={length}
      onChange={setCurrentPage}
      showControls
      siblings={3}
      renderItem={({
        ref,
        key,
        value,
        isActive,
        onNext,
        onPrevious,
        setPage,
        className,
      }) => {
        if (value === PaginationItemType.NEXT) {
          return (
            <button
              key={key}
              className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
              onClick={onNext}
            >
              <ChevronRight size={16} />
            </button>
          );
        }

        if (value === PaginationItemType.PREV) {
          return (
            <button
              key={key}
              className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
              onClick={onPrevious}
            >
              <ChevronLeft size={16} />
            </button>
          );
        }

        if (value === PaginationItemType.DOTS) {
          return (
            <button key={key} className={className}>
              ...
            </button>
          );
        }

        // cursor is the default item

        return (
          <button
            key={key}
            ref={ref}
            className={cn(
              className,
              Boolean(answers[`Q0${value}`]) &&
                "bg-pink-950 transform scale-95",
              isActive && "text-white bg-danger font-bold "
            )}
            onClick={() => setPage(value)}
          >
            {value}
          </button>
        );
      }}
      disableCursorAnimation
    />
  );
}
