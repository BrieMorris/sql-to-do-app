CREATE TABLE "List" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(50) NOT NULL,
  "complete" BOOLEAN DEFAULT false
);

INSERT INTO "List" ("task", "complete")
VALUES ('Laundry', false), 
('Dishes', false);
