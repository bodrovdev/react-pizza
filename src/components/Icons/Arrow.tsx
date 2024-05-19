function Arrow({ arrowClassName }: { arrowClassName: string }) {
  return (
    <svg
      className={arrowClassName}
      viewBox="0 0 320 192"
      xmlns="http://www.w3.org/2000/svg">

      <g clipPath="url(#clip0_21_2)">
        <path d="M317.1 167.387L315.3 165.286L179.3 8.70445C174.7 3.40169 167.8 0.0999756 160.1 0.0999756C152.4 0.0999756 145.5 3.50174 140.9 8.70445L5 164.986L2.7 167.587C0.999997 170.089 0 173.09 0 176.292C0 184.996 7.4 192.1 16.6 192.1H303.4C312.6 192.1 320 184.996 320 176.292C320 172.99 318.9 169.888 317.1 167.387Z" fill="currentColor " />
      </g>
      <defs>
        <clipPath id="clip0_21_2">
          <rect width="320" height="192" fill="white" />
        </clipPath>
      </defs>

    </svg>
  )
}

export default Arrow