#include <glpk.h>

#include <chrono>
#include <iomanip>
#include <iostream>
#include <limits>

int main(int argc, const char* argv[]) {
  if (argc != 2) {
    std::cout << "no argument\n";
    return 1;
  }
  glp_term_out(GLP_OFF);
  auto prob = glp_create_prob();
  auto ret = glp_read_mps(prob, GLP_MPS_DECK, nullptr, argv[1]);
  if (ret) {
    std::cout << "could not read file\n";
    glp_free(prob);
    return 1;
  }
  glp_smcp param;
  param.msg_lev = GLP_MSG_OFF;
  glp_init_smcp(&param);

  auto t0 = std::chrono::high_resolution_clock::now();
  glp_simplex(prob, &param);
  auto t1 = std::chrono::high_resolution_clock::now();
  std::chrono::duration<double, std::milli> dt = t1 - t0;

  std::cout << std::setprecision(std::numeric_limits<double>::digits10 + 1) << glp_get_obj_val(prob) << "\t" << dt.count() << "\n";
  return 0;
}