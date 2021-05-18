.PHONY: run

all: download convert build run

download:
	mkdir -p ./data/raw
	node fetch/fetch

convert:
	wget https://www.netlib.org/lp/data/emps.c -O src/emps.c
	gcc -Wall src/emps.c -o src/emps

	mkdir -p ./data/mps
	node fetch/convert

build:
	g++ -O3 -Wall src/solve.cpp -o src/solve -lglpk

run:
	mkdir -p ./logs
	node run/main-cpp.js > logs/glpk.log
	node run/main.js > logs/glpk-ts.log
	python run/main.py