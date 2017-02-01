#include <iostream>
#include "Message.h"

using std::cout;
using std::endl;

int main(int argc, char *argv[])
{
  Message msg("hello world");
  Message::print(cout, msg) << endl;
  return 0;
}
