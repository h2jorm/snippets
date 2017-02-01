#include <iostream>
#include "Message.h"

using std::ostream;
using std::cout;

ostream &Message::print(ostream &out, Message &m)
{
  return cout << m.contents;
}
