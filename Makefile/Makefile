CXX = g++
CPPFLAGS = -std=c++11 -Wall
ODIR = obj
SDIR = src
EXEC = a.out

FILES = Message main
OBJECTS = $(patsubst %,$(ODIR)/%.o,$(FILES))

build: $(OBJECTS)
	$(CXX) $(CPPFLAGS) -o $(EXEC) $(OBJECTS)

$(OBJECTS): $(ODIR)/%.o: $(SDIR)/%.cpp
	$(CXX) $(CPPFLAGS) -o $@ -c $^

clean:
	rm -f obj/*.o $(EXEC)

rebuild: clean build
