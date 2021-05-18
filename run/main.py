import glob
import glpk
import os
import time

files = sorted(glob.glob('./data/mps/*.mps'))

with open('./logs/pyglpk.log', 'w') as fh:
    for f in files:
        bname = os.path.basename(f)[:-4]
        m = glpk.LPX(mps=f)

        t0 = time.time()
        m.simplex(msg_lev=glpk.LPX.MSG_OFF)
        dt = 1000.0 * (time.time() - t0)
        fh.write(f'{bname}\t{m.obj.value}\t{dt}\n')
